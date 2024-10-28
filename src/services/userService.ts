import prisma from '@@prisma/prisma';
import { faker } from '@faker-js/faker';
import { JWT } from '@helper/jwt';
import { Mail } from '@helper/mail';

import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import validator from 'validator';

export class UserService {
  constructor() {}

  /**
   * Get all users from users table
   *
   * @returns Promise<User>
   */
  async getAllUsers(): Promise<Users[]> {
    const allUsers: Users[] = await prisma.users.findMany();
    return allUsers;
  }

  /**
   * Get one user from user table
   *
   * @param userId number
   *
   * @returns Promise<Users>
   */
  async getOneUser(userId: number): Promise<Users> {
    const user: Users = await prisma.users.findUniqueOrThrow({
      where: { id: userId },
    });
    return user;
  }

  /**
   * Create a new user from users table
   *
   * @param userData type Users
   *
   * @returns Promise<Users>
   */
  async createNewUser(userData: Users): Promise<Users> {
    const user: Users = await prisma.users.create({ data: userData });
    return user;
  }

  /**
   *Updating the user corresponding to the entered ID parameter from users table
   *
   * @param userId number
   * @param userData type Users
   *
   * @returns Promise<Users>
   */
  async updateOneUser(userId: number, userData: Users): Promise<Users> {
    const user: Users = await prisma.users.update({
      where: { id: userId },
      data: userData,
    });
    return user;
  }

  /**
   *Deleting the user corresponding to the entered ID parameter from users table
   *
   * @param userId number
   *
   * @returns user objet had been deleted
   */
  async deleteOneUser(userId: number): Promise<Users> {
    const user: Users = await prisma.users.delete({ where: { id: userId } });
    return user;
  }

  /**
   * Create new user with a hashed password and check user's informations (email, password length, etc...)
   *
   * @param userData type Users
   *
   * @returns Promise<Users>
   */
  async register(userData: Users, confirmPassword: string): Promise<string> {
    // Validation du pseudo
    if (!validator.isLength(userData.name, { max: 20 })) {
      throw new Error('Password must be at maximun 20 characters long');
    }

    // Validation du firstname
    if (!validator.isAlpha(userData.firstName)) {
      throw new Error('firstname must contain only letters');
    }

    // Validation du lastname
    if (!validator.isAlpha(userData.lastName)) {
      throw new Error('lastname must contain only letters');
    }

    // Validation de l'email
    if (!validator.isEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Validation du mot de passe
    if (!validator.isLength(userData.password, { min: 8 })) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (userData.password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Vérification email ou nom d'utilisateur déjà existants
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: userData.email }, { name: userData.name }],
      },
    });
    if (existingUser) {
      throw new Error('Email or username already exists');
    }

    // //Verification email déjà existant
    // if (
    //   await prisma.users.findFirst({
    //     where: { email: userData.email },
    //   })
    // ) {
    //   throw new Error('Email already exists');
    // }

    // //Verification pseudo déjà existant
    // if (
    //   await prisma.users.findFirst({
    //     where: {
    //       name: userData.name,
    //     },
    //   })
    // ) {
    //   throw new Error('This username already exists');
    // }

    //génère un sel aléatoire
    const salt = bcrypt.genSaltSync(10);
    //crée un hachage du mdp en utilisant SHA-512 et le sel
    const hash = await bcrypt.hash(userData.password, salt);

    const hashedPassword = `${hash}`;

    const newUser: Users = await prisma?.users.create({
      data: {
        name: userData.name,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        creationDate: new Date(),
        updateDate: new Date(),
        passwordUpdateDate: new Date(),
        lastLoginDate: new Date(),
        connectionAttempts: 0,
        isActive: false,
        //roleId: 1,
        roleId: await prisma?.role
          .findUnique({ where: { name: 'user' } })
          .then((user) => user?.id),
        curencyId: 1,
      },
    });

    let jwt = new JWT();
    try {
      const mail = new Mail();

      const code = faker.number.int({ min: 1000, max: 9999 });

      await prisma.confirmationCode.create({
        data: { userId: newUser.id, code: code.toString() },
      });

      jwt.values = { code: code.toString(), firstname: userData.firstName };
      jwt.options = { expiresIn: '24h' };
      mail.to = userData.email;
      mail.body = {
        path: './src/mailer/confirmEmail.twig',
        variables: {
          firstname: userData.firstName,
          code: code,
          host: 'https://api.kakeibo.pandacrp.com',
          token: jwt.token,
        },
      };
      await mail.send();
    } catch (e) {
      console.error(e);
      throw new Error('Error during sending email');
    }

    jwt = new JWT();

    jwt.values = { id: newUser.id.toString(), email: newUser.email };

    return jwt.token;
  }

  //fct pour récupérer un utilisateur en fct de son email

  /**
   * Get all user and check if the email corresponding to the entered mail parameter and check if the email is the present from users table
   *
   * @param email string
   *
   * @returns Promise<User> or undefined
   */
  async getUserByEmail(email: string): Promise<Users | null> {
    try {
      return await prisma.users.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  async confirmEmail(token: string, code: string): Promise<string> {
    const jwt = new JWT();
    jwt.token = token;

    try {
      jwt.verify();
    } catch (e) {
      throw new Error('Token is invalid or expired');
    }

    try {
      await prisma.confirmationCode.findFirstOrThrow({
        where: { code: code, userId: Number(jwt.values.id) },
      });
    } catch (e) {
      throw new Error('Invalid code');
    }

    await prisma.users.update({
      where: { id: Number(jwt.values.id) },
      data: { isActive: true },
    });

    jwt.values = { id: jwt.values.id };
    jwt.options = { expiresIn: '7d' };
    return jwt.token;
  }
}
