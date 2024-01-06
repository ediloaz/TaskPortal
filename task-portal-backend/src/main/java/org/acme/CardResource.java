package org.acme;

import org.acme.util.CsrfUtil;

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
import jakarta.ws.rs.HeaderParam;
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
    @Path("/byOwnerId/{ownerId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public List<Card> getCardsByOwnerId(@PathParam("ownerId") Long ownerId) {
        return Card.list("ownerId", ownerId);
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
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCard(@HeaderParam("X-CSRF-Token") String csrfToken, Card card) {
        // TODO: VALIDATE TOKEN
        card.persist();

        return Response.status(Response.Status.CREATED).build();
    }

    @POST
    @Path("/updateStatus")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateStatus(@HeaderParam("X-CSRF-Token") String csrfToken, Card card) {
        // TODO: VALIDATE TOKEN
        Card existingCard = Card.findById(card.getId());

        if (existingCard != null) {
            existingCard.setStatus(card.getStatus());
            existingCard.persist();

            return Response.status(Response.Status.CREATED).build();
        }else{
            return Response.status(Response.Status.BAD_REQUEST)
            .entity("Not found card id")
            .build();
        }
    }

    @POST
    @Path("/updateImage")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateImage(@HeaderParam("X-CSRF-Token") String csrfToken, Card card) {
        // TODO: VALIDATE TOKEN
        Card existingCard = Card.findById(card.getId());

        if (existingCard != null) {
            existingCard.setImage(card.getImage());
            existingCard.persist();

            return Response.status(Response.Status.CREATED).build();
        }else{
            return Response.status(Response.Status.BAD_REQUEST)
            .entity("Not found card id")
            .build();
        }
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
