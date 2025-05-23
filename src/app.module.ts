import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './modules/tags/tags.module';
import { PostsModule } from './modules/posts/posts.module';
import { CacheModule } from './modules/cache/cache.module';
import { HealthModule } from './modules/health/health.module';
import { TwitchModule } from './modules/twitch/twitch.module';
import { YoutubeModule } from './modules/youtube/youtube.module';
import { MatchesModule } from './modules/matches/matches.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CategoriesModule } from './modules/categories/categories.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { GlobalExceptionFilter } from './common/filters/http-exceptions.filter';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 60,
        },
      ],
    }),
    TagsModule,
    PostsModule,
    CacheModule,
    HealthModule,
    TwitchModule,
    YoutubeModule,
    MatchesModule,
    CategoriesModule,
    TournamentsModule,
    UserProfileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
