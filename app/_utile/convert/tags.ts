import { Tags as PrismaTags, Tagging } from '@prisma/client';
import { HikasenVtuber, Tag, Tags } from '@/(types)';

/**
 * プレイスタイルや配信スタイルなどの属性タグを、カテゴリー毎に分類しオブジェクトにする
 * @param channels PrismaChannel
 * @returns
 */
export const convertTaggingToTags = (channels): HikasenVtuber<Tags>[] => {
  return channels.map((channel) => {
    //DBのタグ情報は、1つのテーブルに入っているので、種類毎に使いやすいように分割する
    const contents: Tag[] = [];
    const party: Tag[] = [];
    const timezone: Tag[] = [];
    channel.tags.forEach((tag) => {
      //ソートのために必要なID、表示に必要な名前、コードのみにオブジェクトを限定する
      const convert = {
        id: tag.tags.id,
        name: tag.tags.name,
        code: tag.tags.code,
        type: tag.tags.type,
      };

      //見やすいようにSwitch文で切り分ける
      switch (tag.tags.type) {
        case 'content':
          contents.push(convert);
          break;
        case 'play':
          party.push(convert);
          break;
        case 'timezone':
          timezone.push(convert);
          break;
        default:
          break;
      }
    });

    //サーバー登録順は必ずしもID順に並んでいないので、ID順に並べ直させる
    contents.sort((a, b) => {
      return a.id - b.id;
    });
    party.sort((a, b) => {
      return a.id - b.id;
    });
    timezone.sort((a, b) => {
      return a.id - b.id;
    });

    //
    return {
      ...channel,
      tags: {
        content: contents,
        party: party,
        timezone: timezone,
      },
    };
  });
};

export const convertTagsToCategoryTags = (tags: PrismaTags[] | Tag[]): Tags => {
  //DBのタグ情報は、1つのテーブルに入っているので、種類毎に使いやすいように分割する
  const contents: Tag[] = [];
  const party: Tag[] = [];
  const timezone: Tag[] = [];

  tags.forEach((tag) => {
    //ソートのために必要なID、表示に必要な名前、コードのみにオブジェクトを限定する
    const convert = {
      id: tag.id,
      name: tag.name,
      code: tag.code,
      type: tag.type,
    };

    //見やすいようにSwitch文で切り分ける
    switch (tag.type) {
      case 'content':
        contents.push(convert);
        break;
      case 'play':
        party.push(convert);
        break;
      case 'timezone':
        timezone.push(convert);
        break;
      default:
        break;
    }
  });

  //サーバー登録順は必ずしもID順に並んでいないので、ID順に並べ直させる
  contents.sort((a, b) => {
    return a.id - b.id;
  });
  party.sort((a, b) => {
    return a.id - b.id;
  });
  timezone.sort((a, b) => {
    return a.id - b.id;
  });

  const convertTags = {
    content: contents,
    party: party,
    timezone: timezone,
  };

  return convertTags;
};
