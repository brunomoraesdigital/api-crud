/* eslint-disable prettier/prettier */

import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Postagem from 'App/Models/Postagem'

import Application from '@ioc:Adonis/Core/Application'

export default class PostagemsController {
    private validationOptions = {
        types: ['image'],
        size: '2mb',
    }
    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
        const image = request.file('imagem_postagem', this.validationOptions)
        if (image) {
            const imageName = `${uuidv4()}.${image.extname}`
            await image.move(Application.tmpPath('uploads'), {
                name: imageName,
            })
            body.imagem_postagem = imageName
        }
        const postagem = await Postagem.create(body)
        response.status(201)
        return {
            message: 'momento criado com sucesso!',
            data: postagem,
        }
    }
}
