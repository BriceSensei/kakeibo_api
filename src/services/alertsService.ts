import prisma from "@@prisma/prisma";

import { Alerts } from "@prisma/client";

export class AlertService {
  constructor() {}

  /**
   * Get all alert from alerts table
   *
   * @returns Promise<Alerts>
   */
  async getAllAlerts(): Promise<Alerts[]> {
    const allAlerts: Alerts[] = await prisma.alerts.findMany();

    return allAlerts;
  }

  /**
   * Get one alert from alertId
   *
   * @param alertId: number
   *
   * @returns: Promise<Alerts>
   */
  async getOneAlert(alertId: number): Promise<Alerts> {
    const alert: Alerts = await prisma.alerts.findUniqueOrThrow({
      where: { id: alertId },
    });

    return alert;
  }

  /**
   * Create a new alert in alerts table
   *
   * @param alertData type Alerts
   *
   * @returns Promise<Alerts>
   */
  async createNewAlert(alertData: Alerts): Promise<Alerts> {
    const alert: Alerts = await prisma.alerts.create({ data: alertData });

    return alert;
  }

  /**
   * Updating the alert corresponding to the entered ID parameter from Alerts table
   *
   * @param alertId number
   * @param alertData type Alerts
   *
   * @returns Promise<Alerts>
   */
  async updateOneAlert(alertId: number, alertData: Alerts): Promise<Alerts> {
    const alert: Alerts = await prisma.alerts.update({
      where: { id: alertId },
      data: alertData,
    });

    return alert;
  }

  /**
   * Deleting the alert corresponding to the entered ID parameter from Alerts table
   *
   * @param alertId number
   *
   * @returns alert objet had been deleted
   */
  async deleteOneAlert(alertId: number) {
    const alert: Alerts = await prisma.alerts.delete({
      where: { id: alertId },
    });

    return alert;
  }

  async getAlertByIdAndUser(
    alertId: number,
    userId: number
  ): Promise<Alerts | null> {
    return prisma.alerts.findFirst({
      where: {
        id: alertId,
        userId: userId, // On vérifie que l'alerte appartient bien à cet utilisateur
      },
    });
  }
}
