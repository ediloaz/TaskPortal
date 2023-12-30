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

    // @OneToMany(mappedBy = "Account", cascade = CascadeType.ALL, orphanRemoval = true)
    // public List<Card> cards;

    // @Column(name = "age")
    // public String age;

    // @Column(name = "gender")
    // public String gender;

    // @Column(name = "telephone")
    // public String telephone;

    public Account() {}

    public Account(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
