package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
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

    @Column(name = "position")
    public int position;

    @Column(name = "owner_id")
    public Long ownerId;

    public Card() {}

    public Card(String title, String description, String status, int position, Long ownerId) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.position = position;
        this.ownerId = ownerId;
    }

    public Long getId() {
        return this.id;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
