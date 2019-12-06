module.exports = {
  language: 'Korean',
  languageNative: '한국어',
  languageCode: 'ko',
  countryCode: 'kr',

  general: {
    filtered: {
      missingPermission: '이 명령어를 실행하기에는 당신의 권한이 부족합니다.'
    },
    error: {
      command: '작업 처리 중 예외가 발생했어요.\n> {message}'
    }
  },
  commands: {
    ping: {
      pong: '퐁! {responseTime}ms가 소요되었어요.'
    },
    help: {
      title: '도움말',
      description: `
Airi Sato를 사용해주셔서 감사합니다.`
    },
    say: {
      noMessage: '따라 말할 내용이 없었어요!'
    },
    said: {
      noMessage: '따라 말할 내용이 없었어요!',
      permissionError: '당신의 메세지를 지울 권한이 없거나 이미 지워진 메세지인 것 같아요.\n> {error}'
    },
    userinfo: {
      title: '사용자 정보',
      description: `
{username}님은 {joined}에 이 서버에 가입했어요.
> [프로필 사진]({displayAvatarURL})`,
      noMember: '메세지에서 멘션이나 사용자 명 또는 별명을 찾지 못했어요.',
      mobile: '모바일',
      desktop: '데스크톱',
      nickname: '별명',
      noNickname: '이 사용자는 현재 서버에서 닉네임을 설정하지 않았어요.',
      // id: 'ID',
      createdTimestamp: '가입 날짜',
      displayColor: '색상 코드',
      highestRole: '최상위 역할',
      noRole: '이 사용자는 현재 서버에서 역할을 소유하고 있지 않아요.',
      status: '상태',
      online: '온라인',
      idle: '자리 비움',
      offline: '오프라인',
      dnd: '방해 금지',
      tag: '태그',
      muted: [
        '마이크 음소거',
        ':microphone2: 마이크가 음소거되어 있지 않아요.',
        ':regional_indicator_x: 마이크가 음소거되어 있어요.'
      ],
      deafen: [
        '헤드셋 음소거',
        ':speaker: 헤드셋이 음소거되어 있지 않아요.',
        ':regional_indicator_x: 헤드셋이 음소거되어 있어요.'
      ],
      game: '게임',
      gameMessage: '{name} {type}',
      gameType: {
        PLAYING: '플레이 중',
        STREAMING: '스트리밍 중',
        LISTENING: '듣는 중',
        WATCHING: '보는 중'
      },
      notPlaying: '이 사용자는 아무것도 플레이하지 않고 있어요.',
      roles: '역할'
    },
    serverinfo: {
      description: `
{name} 서버는 {owner}님에 의해 {created}에 생성되었어요.

**채널 {channelSize}개** (채팅 채널 {textChannels}개와 음성 채널 {voiceChannels}개)
**사용자 {userSize}명** (봇 {bots}개, {online}명 온라인, {playing}명 게임 플레이 중, {web}명 웹 클라이언트 사용 중, {desktop}명 데스크톱 클라이언트 사용 중, {mobile}명 모바일 클라이언트 사용 중)
**이모지 {emojiSize}개** (움직이는 이모지 {animated}개)
**역할 {rolesSize}개**`,
      afkChannel: '잠수 채널',
      afkChannelName: ':sound: {afkChannel}',
      noAfkChannel: '이 서버에는 잠수 채널이 없어요.',
      afkTimeout: '잠수 제한 시간',
      afkTimeoutStatus: '{time}초',
      owner: '소유자',
      id: 'ID',
      region: '지역',
      regions: {
        brazil: ':flag_br: 브라질',
        'eu-central': ':flag_eu: 중유럽',
        hongkong: ':flag_hk: 홍콩',
        india: ':flag_in: 인도',
        japan: ':flag_jp: 일본',
        russia: ':flag_ru: 러시아',
        singapore: ':flag_sg: 싱가포르',
        southafrica: ':flag_za: 남아프리카',
        sydney: ':flag_au: 시드니',
        'us-central': ':flag_us: 미국 중부',
        'us-east': ':flag_us: 미국 동부',
        'us-south': ':flag_us: 미국 남부',
        'us-west': ':flag_us: 미국 서부',
        'eu-west': ':flag_eu: 서유럽',
        'south-korea': ':flag_kr: 대한민국'
      },
      defaultMessageNotification: '기본 알림 설정',
      defaultMessageNotifications: {
        allMessages: '모든 메세지',
        mentionOnly: '@mentions만'
      },
      explicitContentFilter: '유해 콘텐츠 필터',
      explicitContentFilters: [
        '할머니 댁에서 과자를 먹으며 놀던 그 느낌으로 **메세지를 스캔하지 않습니다.**',
        '확인된 사용자를 위한 역할이 구비된 서버를 위해 **역할이 없는 사용자의 메세지를 스캔합니다.**',
        '아주 깨끗한 채팅 환경을 원할 시에는 **모든 멤버의 메세지를 스캔합니다.**'
      ],
      verificationLevel: '보안 수준',
      verificationLevels: [
        '**없음**, 제한 없음',
        '**낮음**, 자신의 Discord 계정이 이메일 인증을 받은 적이 있어야 합니다.',
        '**중간**, 추가로 Discord에 가입한지 5분이 지나야 합니다.',
        '**(╯°□°）╯︵ ┻━┻**, 추가로 이 서버의 멤버가 된 지 10분이 지나야 합니다.',
        '**┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻**, 전화 인증이 완료된 Discord 계정이어야 합니다.'
      ],
      mfaLevel: '서버 2단계 인증',
      mfaLevels: [
        '서버 2단계 인증이 비활성화되어 있습니다.',
        '서버 2단계 인증이 활성화되어 있습니다.'
      ]
    },
    avatar: {
      title: '{username}님의 프로필 사진'
    },
    length: {
      out: '접두사 및 명령어를 제외한 메세지의 길이는 {length}자예요.'
    },
    play: {
      voiceChannelMissing: '음악을 재생하기 전에 먼저 음성 채널에 입장해주세요.',
      searchQueryMissing: '재생할 음악을 검색하거나 링크를 첨부해주세요.',
      nowPlaying: {
        title: '지금 재생 중',
        description: '[{title}]({videoURL})\n{author}, {duration}'
      },
      inactive: '현재 채널에 저를 제외해 아무도 없거나 어떠한 노래도 재생하고 있지 않아 음악을 비활성화했습니다. 음악을 들으려면 다시 명령어를 사용해주세요.',
      queued: {
        title: '재생목록 추가',
        description: '[{title}]({videoURL})\n{author}, {duration}'
      },
      emptyQueue: '모든 음악을 재생하여 재생목록이 비었습니다.',
      playbackError: '재생 중 오류'
    },
    resume: {
      resumed: '음악을 다시 재생 중이예요.',
      notPlaying: '지금 아무것도 플레이하고 있지 않아요.',
      alreadyPaused: '이미 음악을 재생 중입니다.'
    },
    pause: {
      paused: '음악을 일시정지했어요.',
      notPlaying: '지금 아무것도 플레이하고 있지 않아요.',
      alreadyPaused: '이미 음악이 일시정지되어 있어요.'
    },
    skip: {
      skipped: '현재 재생 중인 음악을 건너뛰었습니다.',
      notPlaying: '지금 아무것도 플레이하고 있지 않아요.'
    },
    stop: {
      stopped: '현재 음악 세션을 취소했습니다.',
      notPlaying: '지금 아무것도 플레이하고 있지 않아요.'
    },
    nowplaying: {
      embed: {
        title: '지금 재생 중',
        description: '[{title}]({videoURL})\n{author}, {duration}'
      },
      notPlaying: '지금 아무것도 플레이하고 있지 않아요.'
    },
    queue: {
      emptyQueue: '재생목록이 비어 있어요.',
      queue: '재생목록',
      leftQueue: '재생목록에 현재 {left}곡이 담겨있어요.\n\n{queue}'
    }
  }
}
