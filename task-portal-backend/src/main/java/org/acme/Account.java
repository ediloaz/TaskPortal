package org.acme;

import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Account extends PanacheEntity {
    @Column(name = "username")
    public String username;
    
    @Column(name = "password")
    public String password;

    @Column(name = "csrf_token")
    public String csrfToken;

    @Column(name = "age")
    public String age;

    @Column(name = "gender")
    public String gender;

    @Column(name = "phone")
    public String phone;

    public Account() {}

    public Account(String username, String password, String csrfToken) {
        this.username = username;
        this.password = password;
        this.csrfToken = csrfToken;
    }
    
    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getCsrfToken() {
        return this.csrfToken;
    }

    public void setCsrfToken(String csrfToken) {
        this.csrfToken = csrfToken;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
