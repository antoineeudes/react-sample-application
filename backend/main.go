package main

import (
	"API/middleware"
	"API/models"
	"API/router"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/rs/cors"
)

func main() {
	router := router.InitializeRouter()
	defer models.GetDB().Close()
	router.Use(middleware.JwtAuthentication)
	LoggingHandler := handlers.LoggingHandler(os.Stdout, router)
	handler := cors.Default().Handler(LoggingHandler)
	log.Fatal(http.ListenAndServe(":5000", handler))
}
