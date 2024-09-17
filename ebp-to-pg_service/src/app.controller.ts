import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class TablesController {
  constructor(private readonly appService: AppService) {}

  @Get('extract')
  async extractAllTables() {
    try {
      const tables = await this.appService.extractAllTables();
      return { tables };
    } catch (error) {
      console.error("Erreur lors de l'extraction des tables:", error);
      throw error;
    }
  }

  @Post('drop-all')
  async dropAllTables() {
    try {
      await this.appService.dropAllTables();
      return { message: 'Toutes les tables ont été supprimées avec succès.' };
    } catch (error) {
      console.error('Erreur lors de la suppression des tables:', error);
      throw error;
    }
  }

  @Post('truncate-all')
  async truncateAllTables() {
    try {
      await this.appService.truncateAllTables();
      return { message: 'Toutes les tables ont été vidées avec succès.' };
    } catch (error) {
      console.error('Erreur lors du vidage des tables:', error);
      throw error;
    }
  }

  @Delete('drop')
  async dropTable(@Body() body: { tableName: string }) {
    const { tableName } = body;
    try {
      const message = await this.appService.dropTableByName(tableName);
      return { message };
    } catch (error) {
      console.error('Erreur lors de la suppression de la table:', error);
      throw error;
    }
  }

  @Post('truncate')
  async truncateTable(@Body() body: { tableName: string }) {
    const { tableName } = body;
    try {
      const message = await this.appService.truncateByTableName(tableName);
      return { message };
    } catch (error) {
      console.error('Erreur lors du vidage de la table:', error);
      throw error;
    }
  }

  @Post('structure')
  async getTableStructure(@Body() body: { tableName: string }) {
    const { tableName } = body;
    if (!tableName) {
      return { error: 'Le nom de la table est requis.' };
    }

    try {
      const structure = await this.appService.getTableStructure(tableName);
      return structure;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération de la structure de la table:',
        error,
      );
      throw new Error(
        `Impossible de récupérer la structure de la table '${tableName}'.`,
      );
    }
  }

  @Post('sync')
  async syncData() {
    try {
      await this.appService.insertDataFromMSSQLToPGSQL();
      return { message: 'Les données ont été synchronisées avec succès.' };
    } catch (error) {
      console.error('Erreur lors de la synchronisation des données:', error);
      throw error;
    }
  }

  @Get('sync-select')
  async syncDataSelect() {
    try {
      await this.appService.insertDataFromMSSQLToPGSQLSelect();
      return {
        message: 'Les données autorisées ont été synchronisées avec succès.',
      };
    } catch (error) {
      console.error(
        'Erreur lors de la synchronisation des données autorisées:',
        error,
      );
      throw error;
    }
  }
}
