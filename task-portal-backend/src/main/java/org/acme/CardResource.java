package org.acme;

import org.jboss.logging.Logger;

import java.util.Set;
import java.util.List;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.DELETE;
import java.util.Collections;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.PathParam;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;

@Path("/card")
public class CardResource {

    @GET
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public List<Card> getAllCards() {
        return Card.listAll();
    }

    @GET
    @Path("/titles")
    @Produces(MediaType.TEXT_PLAIN)
    public String titles() {
        List<Card> cards = Card.listAll();
        String titles = cards.stream().map(g-> g.title)
        .collect(Collectors.joining (", "));
        return titles;
    }

    @POST
    @Path("/post")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCard(Card card) {
        System.out.println("Received card: " + card);
        // card.persist();

        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteCard(@PathParam("id") Long id) {
        Card card = Card.findById(id);
        if (card == null) {
            throw new WebApplicationException("Card with id of " + id + " does not exist.", 404);
        }
        card.delete();
        return Response.noContent().build();
    }
}
