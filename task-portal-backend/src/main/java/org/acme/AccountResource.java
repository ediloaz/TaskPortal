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

@Path("/account")
public class AccountResource {

    @GET
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public List<Account> getAllAccount() {
        return Account.listAll();
    }
}
