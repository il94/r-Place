import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GridService implements OnApplicationBootstrap {
	constructor(private prisma: PrismaService) {}

	// Creation de la grille avec les 1600 cellules
	async onApplicationBootstrap() {

		const gridExist = await this.prisma.grid.findFirst({})
		if (!gridExist)
		{
			try {
				const grid = await this.prisma.grid.create({})
				for (let i = 0; i < 1600; i++) {
					await this.prisma.cell.create({
						data: {
							gridId: grid.id,
							idOnGrid: i,
							color: "white"
						}
					})
				}
			}
			catch (error) {
				console.error('Erreur lors de la création de la grille:', error)
			}
		}
	}

	async getGrid() {
		try {
			const gridId = (await this.prisma.grid.findFirst({
				where: {
					id: 1
				},
				select: {
					id: true
				}
			})).id
			if (!gridId)
				throw new NotFoundException

			const cellsGrid = await this.prisma.cell.findMany({
				where: {
					gridId: gridId
				},
				orderBy: {
					idOnGrid: 'asc'
				}
			})

			const grid = {
				id: gridId,
				cells: cellsGrid
			}

			return (grid)
		}
		catch (error) {
			throw error
		}
	}
}
