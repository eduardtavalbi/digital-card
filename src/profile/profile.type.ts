import { Field, ObjectType } from '@nestjs/graphql';
import { Skill } from './models/skill.type';
import { Experience } from './models/experience.type';
import { Project } from './models/project.type';

@ObjectType()
export class Profile {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  github?: string | null;

  @Field(() => String, { nullable: true })
  linkedin?: string | null;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experience: Experience[];

  @Field(() => [Project])
  projects: Project[];
}
