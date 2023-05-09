import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Postagem extends BaseModel {
  @column({ isPrimary: true })
  public id_postagem: number

  @column()
  public titulo_postagem: string

  @column()
  public imagem_postagem: string

  @column()
  public texto_postagem: string

  @column()
  public autor_postagem: number

  @column()
  public categoria_postagem: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
