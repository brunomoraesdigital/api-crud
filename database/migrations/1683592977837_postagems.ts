import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'postagems'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_postagem')
      table.string('titulo_postagem')
      table.string('imagem_postagem')
      table.string('texto_postagem')
      table.integer('autor_postagem')
      table.integer('categoria_postagem')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
