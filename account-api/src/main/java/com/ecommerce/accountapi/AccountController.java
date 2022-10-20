package com.ecommerce.accountapi;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    @PostMapping("/account")
    public Account newAccount(@RequestBody Account account){
        account.addAccount(account);
        return account;
    }

}