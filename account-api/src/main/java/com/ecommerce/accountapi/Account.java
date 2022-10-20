package com.ecommerce.accountapi;

import java.util.ArrayList; 

public class Account {
    private String firstName;
    private String secondName;
    private String email;
    private String password;
    private static ArrayList<Account> accounts = new ArrayList<Account>();

    public Account(String firstName, String secondName, String email, String password) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.password = password;
    }
    
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void addAccount(Account account){
        accounts.add(account);
        System.out.println(accounts);
    }



}
