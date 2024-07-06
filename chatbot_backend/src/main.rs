use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::Deserialize;

#[derive(Deserialize)]
struct ChatRequest {
    message: String,
}

async fn index() -> impl Responder {
    "Hello, chatbot!"
}

async fn chat(chat_request: web::Json<ChatRequest>) -> impl Responder {
    let response = format!("You said: {}", chat_request.message); // Replace this with actual OpenAI API call
    HttpResponse::Ok().json(serde_json::json!({ "response": response }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .route("/", web::get().to(index))
            .route("/api/chat", web::post().to(chat))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

