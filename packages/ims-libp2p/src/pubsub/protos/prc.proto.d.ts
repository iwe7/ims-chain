declare const _default: "\nmessage RPC {\n  repeated SubOpts subscriptions = 1;\n  repeated Message msgs = 2;\n  message SubOpts {\n    optional bool subscribe = 1; // subscribe or unsubcribe\n    optional string topicCID = 2;\n  }\n  message Message {\n    optional bytes from = 1;\n    optional bytes data = 2;\n    optional bytes seqno = 3;\n    repeated string topicIDs = 4;\n  }\n}";
export default _default;
//# sourceMappingURL=prc.proto.d.ts.map