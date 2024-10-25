import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Request } from "express"


export interface Pagination{
    page: Number,
    size: Number,
    limit: Number,
    offset:Number
    
}

export const PaginationParams = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string)
    const size = parseInt(req.query.size as string)

    if (isNaN(page) || page < 0 || isNaN(size) || size < 0) {
        throw new BadRequestException('invalid pagination params')
    }
    if (size > 100) {
        throw new BadRequestException()
    }
    const limit = size
    const offset = page * limit
    return {page,limit,size,offset}
})