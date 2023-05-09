/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */

import {v4 as uuidv4} from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Postagem from 'App/Models/Postagem'

import Application from '@ioc:Adonis/Core/Application'

export default class PostagemsController {
    private validationOptions = {
        types: ['image'],
        size: '25mb',
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
    /* ------------------------ */
    public async index() {
        const postagems = await Postagem.all()
        return {
            data: postagems,
        }
    }

    public async show({params}: HttpContextContract) {

        const postagem = await Postagem.findOrFail(params.id)
        return {
            data: postagem,
        }
    }

    public async destroy({params}: HttpContextContract) {

        const postagem = await Postagem.findOrFail(params.id)
        await postagem.delete()
        return {
            message: 'Postagem excluída com sucesso!!!',
            data: postagem,
        }
    }

    public async update({params, request}: HttpContextContract) {
        
        const body = request.body()
        const postagem = await Postagem.findOrFail(params.id)
        postagem.titulo_postagem = body.titulo_postagem
        postagem.texto_postagem = body.texto_postagem
        if (postagem.imagem_postagem != body.imagem_postagem || !postagem.imagem_postagem) {
            const image = request.file('imagem_postagem', this.validationOptions)
            if (image) {
            const imageName = `${uuidv4()}.${image.extname}`
            await image.move(Application.tmpPath('uploads'), {
                name: imageName,
            })
            postagem.imagem_postagem = imageName
        }
        }
        postagem.autor_postagem = body.autor_postagem
        postagem.categoria_postagem = body.categoria_postagem

        await postagem.save()

        return {
            message: 'Postagem atualizado com sucesso!!!',
            data: postagem,
        }

    }
}
