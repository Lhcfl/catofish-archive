use crate::service::stream::{publish_to_stream, Error, Stream};

#[derive(strum::Display)]
#[crate::export(string_enum = "camelCase")]
pub enum ChatEvent {
    #[strum(serialize = "message")]
    Message,
    #[strum(serialize = "read")]
    Read,
    #[strum(serialize = "deleted")]
    Deleted,
    #[strum(serialize = "typing")]
    Typing,
}

// We want to merge `kind` and `object` into a single enum
// https://github.com/napi-rs/napi-rs/issues/2036

#[crate::export(js_name = "publishToChatStream")]
pub async fn publish(
    sender_user_id: String,
    receiver_user_id: String,
    kind: ChatEvent,
    object: &serde_json::Value,
) -> Result<(), Error> {
    publish_to_stream(
        &Stream::Chat {
            sender_user_id,
            receiver_user_id,
        },
        Some(kind.to_string()),
        Some(serde_json::to_string(object)?),
    )
    .await
}
