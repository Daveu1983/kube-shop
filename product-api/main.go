package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

type Product struct {
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Quantity    int     `json:"quantity"`
	Size        string  `json:"size"`
	Colour      string  `json:"colour"`
}

func main() {
	productArray := []Product{
		{
			Title:       "t-shirt",
			Description: "funky and loud",
			Price:       5,
			Quantity:    0,
			Size:        "XL",
			Colour:      "blue",
		},
		{
			Title:       "jumper",
			Description: "plain pattern",
			Price:       10,
			Quantity:    0,
			Size:        "L",
			Colour:      "white",
		},
		{
			Title:       "jeans",
			Description: "straight denim",
			Price:       15,
			Quantity:    0,
			Size:        "32L30W",
			Colour:      "red",
		},
		{
			Title:       "polo shirt",
			Description: "plain",
			Price:       7,
			Quantity:    0,
			Size:        "small",
			Colour:      "purple",
		},
	}

	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if origin == "http://localhost:3001" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		}
		productArray := getPrices(productArray)
		jsonProduct, err := json.Marshal(productArray)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonProduct)
	})
	http.ListenAndServe(":8001", nil)
}

func getPrices(productArray []Product) []Product {
	new_price := 0
	apiURL := "http://localhost:5000/api"
	for index, product := range productArray {
		params := url.Values{
			"title": {fmt.Sprintf("%s", product.Title)},
			"price": {fmt.Sprintf("%f", product.Price)},
		}

		fullURL := apiURL + "?" + params.Encode()

		response, err := http.Get(fullURL)
		if err != nil {
			fmt.Printf("Error for product: %v - %v\n", product, err)
			continue
		}

		defer response.Body.Close()

		responseBody, err := ioutil.ReadAll(response.Body)
		if err != nil {
			fmt.Printf("Error reading response for product: %v - %v\n", product, err)
			continue
		}

		var apiResponse float64
		if err := json.Unmarshal(responseBody, &apiResponse); err != nil {
			fmt.Printf("Error parsing JSON for product: %v - %v\n", new_price, err)
			continue
		}
		product.Price = apiResponse
		productArray[index] = product
	}
	return productArray
}
