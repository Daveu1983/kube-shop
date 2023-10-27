package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

type Product struct {
	title string
	description string
	price float64
	quantity int
}


func main () {
	product1 := Product {
		title: "t-shirt",
		description: "funky and loud",
		price: 5,
		quantity: 0,
	}
	product2 := Product {
		title: "jumper",
		description: "plain pattern",
		price: 10,
		quantity: 0,
	}
	product3 := Product {
		title: "jeans",
		description: "straight denim",
		price: 15,
		quantity: 0,
	}
	product4 := Product {
		title: "polo shirt",
		description: "plain",
		price: 7,
		quantity: 0,
	}
	productArray := [] Product{product1, product2, product3, product4}
	getPrices(productArray)
	
}

func getPrices(productArray []Product) []Product {
	new_price := 0
	apiURL := "http://localhost:5000/api"
	for _, product := range productArray {
		params := url.Values{
			"title": {fmt.Sprintf("%s",product.title)},
			"price": {fmt.Sprintf("%f",product.price)},
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

        fmt.Printf("Response for product: %v\n", apiResponse)
    }
	return productArray
}






