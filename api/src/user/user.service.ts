import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In, FindOneOptions } from 'typeorm'
import { User } from './user.entity'
import { SaveUserDto } from './dto/save-user.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) {}

    async get(userId: number): Promise<User> {
        const user = await this.repo.findOne({
            where: { userId },
            // relations: {
            //     authoredReports: true,
            //     assignedReports: true,
            // },
        })
        if (user == null)
            throw new HttpException(
                `No user with id ${userId} exist.`,
                HttpStatus.NOT_FOUND,
            )
        return user
    }

    async getAll(filter?: { userIds?: number[] }): Promise<User[]> {
        const options: FindOneOptions<User> = {
            // relations: {
            //     authoredReports: true,
            //     assignedReports: true,
            // },
        }
        if (filter) {
            options.where = {}
            if (filter.userIds) options.where.userId = In(filter.userIds)
        }
        return await this.repo.find(options)
    }

    async create(data: SaveUserDto) {
        const newUser = this.repo.create(data)
        return await this.repo.save(newUser)
    }

    async update(user: User, updateData: SaveUserDto) {
        const updatedUser = this.repo.merge(user, updateData)
        return await this.repo.save(updatedUser)
    }

    async remove(user: User) {
        return await this.repo.remove(user)
    }
}
