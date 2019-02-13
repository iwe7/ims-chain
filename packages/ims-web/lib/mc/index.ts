export abstract class ImsMc {
  chats: ImsMcChats;
  fans: ImsMcFans;
  fields: ImsMcFields;
  group: ImsMcGroup;
  member: ImsMcMember;
  message: ImsMcMessage;
  trade: ImsMcTrade;
}

export abstract class ImsMcFields {
  abstract list(): Promise<any>;
  abstract post(): Promise<any>;
}

export abstract class ImsMcGroup {
  abstract display(): Promise<any>;
  abstract change_group_level(): Promise<any>;
  abstract save_group(): Promise<any>;
  abstract get_group(): Promise<any>;
  abstract set_default(): Promise<any>;
  abstract del_group(): Promise<any>;
}

export abstract class ImsMcMember {
  abstract address(): Promise<any>;
  abstract base_information(): Promise<any>;
  abstract member_credits(): Promise<any>;
  abstract credit_statistics(): Promise<any>;
  abstract display(): Promise<any>;
  abstract del(): Promise<any>;
  abstract add(): Promise<any>;
  abstract group(): Promise<any>;
  abstract register_setting(): Promise<any>;
  abstract credit_setting(): Promise<any>;
  abstract save_credit_setting(): Promise<any>;
  abstract save_tactics_setting(): Promise<any>;
}

export abstract class ImsMcMessage {
  abstract message_list(): Promise<any>;
  abstract message_info(): Promise<any>;
  abstract message_reply(): Promise<any>;
  abstract message_mark(): Promise<any>;
  abstract message_del(): Promise<any>;
  abstract message_reply_del(): Promise<any>;
  abstract message_switch(): Promise<any>;
}

export abstract class ImsMcTrade {
  abstract consume(): Promise<any>;
  abstract user(): Promise<any>;
  abstract modal(): Promise<any>;
  abstract credit(): Promise<any>;
  abstract card(): Promise<any>;
  abstract cardsn(): Promise<any>;
  abstract tpl(): Promise<any>;
  abstract cardconsume(): Promise<any>;
}

export abstract class ImsMcFans {
  abstract display(): Promise<any>;
  abstract add_tag(): Promise<any>;
  abstract del_tag(): Promise<any>;
  abstract edit_tagname(): Promise<any>;
  abstract edit_fans_tag(): Promise<any>;
  abstract batch_edit_fans_tag(): Promise<any>;
  abstract download_fans(): Promise<any>;
  abstract sync(): Promise<any>;
  abstract fans_sync_set(): Promise<any>;
  abstract register(): Promise<any>;
  abstract sync_member(): Promise<any>;
}

export abstract class ImsMcChats {
  abstract chats(): Promise<any>;
  abstract send(): Promise<any>;
  abstract endchats(): Promise<any>;
}
