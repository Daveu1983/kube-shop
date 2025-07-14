package main

import (
	"encoding/json"
	"net/http"
	"strconv"
    "os"
)

func main(){
    port := os.Getenv("PORT")
    if port == "" {
        port = "5000" 
    }
    http.HandleFunc("/api",func(w http.ResponseWriter, r *http.Request){
        queryParameters := r.URL.Query()
        price := queryParameters.Get("price")
        if floatPrice, err := strconv.ParseFloat(price, 64); err ==nil {
                title := queryParameters.Get("title")       
                newPrice := getPrice(floatPrice, title)
                jsonPrice, err := json.Marshal(newPrice)
                if err != nil {
                    http.Error(w, err.Error(), http.StatusInternalServerError)
                    return
                }
                w.Header().Set("Content-Type", "application/json") 
                w.Write(jsonPrice)
        } else {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
    })
    http.ListenAndServe(":"+port, nil)
}

func getPrice(price float64, title string ) (float64) {
    switch title {
    case "t-shirt":
        price = price * 1.05
    case "jumper":
        price = price * 1.02
    case "jeans":
        price = price * 1.075
    case "polo shirt":
        price = price * 1.06
    }
    if price > 100 {
       price = 100
    }
  return price  
}