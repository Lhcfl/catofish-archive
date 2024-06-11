use crate::{
    model::entity::note,
    service::stream::{publish_to_stream, Error, Stream},
};

// for napi export
// https://github.com/napi-rs/napi-rs/issues/2060
type Note = note::Model;

#[crate::export(js_name = "publishToNotesStream")]
pub async fn publish(note: &Note) -> Result<(), Error> {
    publish_to_stream(&Stream::Notes, None, Some(serde_json::to_string(note)?)).await
}
