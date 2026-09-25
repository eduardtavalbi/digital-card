import { Test, TestingModule } from '@nestjs/testing';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

describe('ProfileResolver', () => {
  let resolver: ProfileResolver;

  const profileServiceMock = {
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileResolver,
        {
          provide: ProfileService,
          useValue: profileServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<ProfileResolver>(ProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return profile from ProfileService', async () => {
    const profile = {
      name: 'Eduard Tavalbi',
      description: 'Backend Developer',
    };

    profileServiceMock.getProfile.mockResolvedValue(profile);

    await expect(resolver.profile()).resolves.toEqual(profile);
    expect(profileServiceMock.getProfile).toHaveBeenCalled();
  });
});