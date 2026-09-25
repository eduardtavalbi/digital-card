import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.type';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  async profile() {
    return this.profileService.getProfile();
  }
}