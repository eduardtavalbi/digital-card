import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Profile GraphQL (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns profile with nested data', async () => {
    const query = `
      query {
        profile {
          name
          description
          skills {
            name
          }
          experience {
            company
            position
          }
          projects {
            name
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.profile.name).toBe('Eduard Tavalbi');
    expect(response.body.data.profile.skills.length).toBeGreaterThan(0);
    expect(response.body.data.profile.experience.length).toBeGreaterThan(0);
    expect(response.body.data.profile.projects.length).toBeGreaterThan(0);
  });
});