package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Card extends PanacheEntity {
    @Column(name = "title")
    public String title;
    
    @Column(name = "description")
    public String description;

    @Column(name = "status")
    public String status;

    // @ManyToOne
    // public Account Account;

    public Card() {}

    public Card(String title, String description) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
