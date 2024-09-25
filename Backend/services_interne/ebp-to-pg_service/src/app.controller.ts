import { Controller, Get, Post, Body, Delete, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

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

  @Get('sync')
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

  @Post('generate-class')
  async generateTsFile(
    @Body() body: { tableName: string },
    @Res() res: Response,
  ) {
    const { tableName } = body;
    if (!tableName) {
      return res.status(400).json({ error: 'Le nom de la table est requis.' });
    }

    try {
      await this.appService.generateTsFromTableStructure(tableName);

      const filePath = path.join(__dirname, `${tableName}.entity.ts`);

      if (!fs.existsSync(filePath)) {
        await this.appService.generateTsFromTableStructure(tableName);
      }

      return res.download(filePath, `${tableName}.entity.ts`);
    } catch (error) {
      console.error(
        `Erreur lors de la génération du fichier TypeScript pour la table '${tableName}':`,
        error,
      );
      return res
        .status(500)
        .json({ error: `Impossible de générer le fichier TypeScript.` });
    }
  }
}
