import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    get(@Param('id') id: number): Promise<User> {
        return this.userService.get(id)
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll()
    }

    @Post()
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.userService.create(body)
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateUserDto,
    ): Promise<User> {
        const course = await this.userService.get(id)
        return await this.userService.update(course, body)
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<User> {
        const course = await this.userService.get(id)
        return await this.userService.remove(course)
    }
}
