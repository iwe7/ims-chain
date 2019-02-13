declare const _default: "\n// topicCID = cid(merkledag_protobuf(topicDescriptor)); (not the topic.name)\nmessage TopicDescriptor {\n  optional string name = 1;\n  optional AuthOpts auth = 2;\n  optional EncOpts enc = 2;\n  message AuthOpts {\n    optional AuthMode mode = 1;\n    repeated bytes keys = 2; // root keys to trust\n    enum AuthMode {\n      NONE = 0; // no authentication, anyone can publish\n      KEY = 1; // only messages signed by keys in the topic descriptor are accepted\n      WOT = 2; // web of trust, certificates can allow publisher set to grow\n    }\n  }\n  message EncOpts {\n    optional EncMode mode = 1;\n    repeated bytes keyHashes = 2; // the hashes of the shared keys used (salted)\n    enum EncMode {\n      NONE = 0; // no encryption, anyone can read\n      SHAREDKEY = 1; // messages are encrypted with shared key\n      WOT = 2; // web of trust, certificates can allow publisher set to grow\n    }\n  }\n}";
export default _default;
//# sourceMappingURL=topic-descriptor.proto.d.ts.map