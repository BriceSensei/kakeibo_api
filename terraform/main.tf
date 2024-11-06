provider "aws" {
  region     = "eu-west-3"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

variable "aws_access_key" {
  description = "AWS Access Key"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
  type        = string
}

variable "key_name" {
  default = "login" 
}

resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.rsa_4096.private_key_pem
  filename = var.key_name
}

resource "aws_security_group" "allow_ssh" {
  name_prefix = "allow_ssh_"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    # cidr_blocks = ["0.0.0.0/0"]
    cidr_blocks = ["176.181.229.44/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ec2_instance" {
  count         = 1
  ami           = "ami-00ac45f3035ff009e"  # version de l'os = AMI
  # ami           = "ami-0359cb6c0c97c6607" # version de débian
  //instance_type = "t2.micro"
  instance_type = "t3.medium"
  key_name      = aws_key_pair.key_pair.key_name

  # groupe de sécurité existant pour autoriser le trafic SSH
  vpc_security_group_ids = ["sg-06cd678b2d1b7f525"]

  tags = {
    Name = "EC2Instance"
  }

  # Configure the root volume size to 50GB
  root_block_device {
    volume_size = 50          # Size in GB
    volume_type = "gp2"       # General Purpose SSD
    delete_on_termination = true
  }


  connection {
    type        = "ssh"
    # user        = "ubuntu" si on utilise une image ubuntu
    user        = "ubuntu"
    private_key = file("./login.pem")  # Update this path to your .pem file
    host        = self.public_ip
      timeout     = "10m"  # Timeout for SSH connection
  }

  provisioner "file" {
    source      = "${path.module}/../ansible/install_docker.yml"
    destination = "/home/ubuntu/install_docker.yml"
  }

  provisioner "file" {
    source      = "${path.module}/../ansible/install_kubernetes.yml"
    destination = "/home/ubuntu/install_kubernetes.yml"
  }

  provisioner "file" {
    source      = "${path.module}/../ansible/setup_runner.yml"
    destination = "/home/ubuntu/setup_runner.yml"
  }

    provisioner "file" {
    source      = "${path.module}/../ansible/install_node_exporter.yml"
    destination = "/home/ubuntu/install_node_exporter.yml"
  }
    provisioner "file" {
      source      = "${path.module}/../nginix/nginx.conf"
      destination = "/home/ubuntu/nginx.conf" 
    }

    provisioner "file" {
      source      = "${path.module}/../ansible/install_certbot_and_nginx.yml"
      destination = "/home/ubuntu/install_certbot_and_nginx.yml"
    }



provisioner "remote-exec" {
    inline = [
      "echo 'Connexion SSH réussie!'",
      "ls -l /home/ubuntu/",
      "echo 'Fichiers transférés!'",
      "echo 'Mise à jour de apt-get en cours...' && sudo apt-get update",
      "echo 'Step 1: Update apt-get'",
      "sudo apt-get update",
      "echo 'Step 2: Install python3-venv and python3-pip'",
      "sudo apt-get -y install python3-venv python3-pip",
      "echo 'Step 3: Create Python virtual environment'",
      "python3 -m venv ansible-env",
      "echo 'Step 4: Activate virtual environment'",
      ". ansible-env/bin/activate",
      "echo 'Step 5: Install Ansible'",
      "pip install ansible",
      "sudo apt-get -y install ansible",
      "echo 'Step 6: Update PATH'",
      "echo 'export PATH=$PATH:/usr/bin' >> ~/.bashrc",
      ". ~/.bashrc",
      "echo 'Step 7: Create run_playbook.sh'",
      "echo 'ansible-playbook /home/ubuntu/install_docker.yml -i \"localhost,\" --ssh-common-args=\"-o StrictHostKeyChecking=no\"' > /home/ubuntu/run_playbook.sh",
      "echo 'ansible-playbook /home/ubuntu/install_kubernetes.yml -i \"localhost,\" --ssh-common-args=\"-o StrictHostKeyChecking=no\"' >> /home/ubuntu/run_playbook.sh",
      "echo 'ansible-playbook /home/ubuntu/setup_runner.yml -i \"localhost,\" --ssh-common-args=\"-o StrictHostKeyChecking=no\"' >> /home/ubuntu/run_playbook.sh",
      "echo 'ansible-playbook /home/ubuntu/install_node_exporter.yml -i \"localhost,\" --ssh-common-args=\"-o StrictHostKeyChecking=no\"' >> /home/ubuntu/run_playbook.sh",
      "echo 'ansible-playbook /home/ubuntu/install_certbot_and_nginx.yml -i \"localhost,\" --ssh-common-args=\"-o StrictHostKeyChecking=no\"' >> /home/ubuntu/run_playbook.sh",
      "chmod +x /home/ubuntu/run_playbook.sh",
      "echo 'Step 8: Run the playbook'",
      "sudo /home/ubuntu/run_playbook.sh",
      # Configuration et rechargement de Nginx
      "echo 'Step 8.5: Create nginx.conf'",
      "sudo cp /home/ubuntu/nginx.conf /etc/nginx/sites-available/default",
      "sudo systemctl reload nginx",
      "echo 'Step 9: Create banner.txt'",
      "cat <<'EOF' > /home/ubuntu/banner.txt",
      "echo ' _______                                                                 _______             __                     ' >> /home/ubuntu/banner.txt",
      "echo '|       \\                                                               |       \\           |  \\                    ' >> /home/ubuntu/banner.txt",
      "echo '| $$$$$$$\\  ______  __     __         ______    ______    _______       | $$$$$$$\\  ______   \\$$  _______   ______  ' >> /home/ubuntu/banner.txt",
      "echo '| $$  | $$ /      \\|  \\   /  \\       /      \\  /      \\  /       \\ | $$__/ $$ /      \\ |  \\ /       \\ /      \\ ' >> /home/ubuntu/banner.txt",
      "echo '| $$  | $$|  $$$$$$\\\\$$\\ /  $$      |  $$$$$$\\|  $$$$$$\\|$$$$$$$    | $$    $$|  $$$$$$\\| $$|  $$$$$$$|  $$$$$$\\' >> /home/ubuntu/banner.txt",
      "echo '| $$  | $$| $$    $$ \\$$\\  $$       | $$  | $$| $$  | $$ \\$$    \\    | $$$$$$$\\| $$   \\$$| $$| $$      | $$    $$' >> /home/ubuntu/banner.txt",
      "echo '| $$__/ $$| $$$$$$$$  \\$$ $$         | $$__/ $$| $$__/ $$ _\\$$$$$$\\   | $$__/ $$| $$      | $$|  $$_____ | $$$$$$$$' >> /home/ubuntu/banner.txt",
      "echo '| $$    $$ \\$$     \\  \\$$$          \\$$    $$| $$    $$|       $$    | $$    $$| $$      | $$ \\$$     \\ \\$$     \\' >> /home/ubuntu/banner.txt",
      "echo ' \\$$$$$$$   \\$$$$$$$   \\$            \\$$$$$$ | $$$$$$$  \\$$$$$$$    \\$$$$$$$  \\$$      \\$$  \\$$$$$$$  \\$$$$$$$' >> /home/ubuntu/banner.txt",
      "echo '                                                 | $$                                                                  ' >> /home/ubuntu/banner.txt",
      "echo '                                                 | $$                                                                  ' >> /home/ubuntu/banner.txt",
      "echo '                                                 \\$$                                                                  ' >> /home/ubuntu/banner.txt",
      "EOF",
      "cat /home/ubuntu/banner.txt",
      "echo 'Step 10: Check Ansible version'",
      "ansible --version",
      "echo 'Step 11: Run playbook and log status'",
      "echo 'Running playbook...' > /home/ubuntu/playbook_status.txt",
      "ansible-playbook /home/ubuntu/install_docker.yml -i \"localhost,\" --ssh-common-args='-o StrictHostKeyChecking=no' >> /home/ubuntu/playbook_status.txt 2>&1",
      "echo 'Playbook finished.' >> /home/ubuntu/playbook_status.txt",
      "cat /home/ubuntu/playbook_status.txt"

    ]
  }

  timeouts {
    create = "30m"
  }
}


# # Elastic IP (EIP) Resource
# resource "aws_eip" "eip" {
#   allocation_id = "eipalloc-0fb5f280e4b2f9675"
# }

# # Associer l'Elastic IP à l'instance EC2
# resource "aws_eip_association" "eip_assoc" {
#   instance_id   = aws_instance.ec2_instance.id
#   allocation_id = aws_eip.eip.id
# }

# output "instance_ips" {
#   value = aws_instance.ec2_instance[*].public_ip
# }