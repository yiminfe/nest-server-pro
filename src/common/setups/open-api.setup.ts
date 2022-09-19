import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export default function openApiSetup(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('nest-server')
    .setDescription('The nest-server API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('user')
    .addTag('blog')
    .addTag('user-relation')
    .addTag('at-relation')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}
