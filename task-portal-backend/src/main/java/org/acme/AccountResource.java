package org.acme;

import org.acme.util.CsrfUtil;
import org.acme.util.SecurityUtil;
import org.jboss.logging.Logger;

import java.util.Set;
import java.util.List;
import jakarta.ws.rs.GET;
import java.util.Optional;
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

@Path("/account")
public class AccountResource {

    private static final Logger LOG = Logger.getLogger(AccountResource.class);

    @GET
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public List<Account> getAllAccount() {
        return Account.listAll();
    }

    @POST
    @Transactional
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Account loginInfo) {
        try {
            Optional<Account> optionalAccount = Account.find("username = ?1", loginInfo.getUsername()).firstResultOptional();
            
            if (optionalAccount.isPresent()) {
                Account existingAccount = optionalAccount.get();
                
                // Check password
                String passwordToCheck = loginInfo.getPassword();
                String passwordStored = existingAccount.getPassword();
                boolean isPasswordCorrect = SecurityUtil.verifyBCryptPassword(passwordStored, passwordToCheck);

                if (isPasswordCorrect) {
                    LOG.info("User logged: " + loginInfo.getUsername());

                    // Generate new token
                    String csrfToken = CsrfUtil.getNewCsrfToken();
                    existingAccount.setCsrfToken(csrfToken);
    
                    existingAccount.persist();
    
                    return Response.ok(existingAccount).build();
                } else {
                    LOG.info("Usuario intentó acceder con el username: " + loginInfo.getUsername() + " y el password: " + loginInfo.getPassword());
                    return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("Credenciales de inicio de sesión incorrectas.")
                        .build();
                }
            } else {
                return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Not found username.")
                    .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error in login, message: " + e.getMessage())
                .build();
        }
    }

    @POST
    @Transactional
    @Path("/checkLogin")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkLogin(Account loginInfo) {
        Optional<Account> optionalAccount = Account.find("username = ?1 and csrfToken = ?2", loginInfo.getUsername(), loginInfo.getCsrfToken()).firstResultOptional();

        if (optionalAccount.isPresent()) {
            Account existingAccount = optionalAccount.get();

            return Response.ok(existingAccount).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Credenciales de inicio de sesión incorrectas.").build();
        }
    }

    @POST
    @Path("/logout")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout(@HeaderParam("X-CSRF-Token") String csrfToken, Account loginInfo) {
        String username = loginInfo.getUsername();

        if (CsrfUtil.validateCsrfToken(username, csrfToken)) {
            Optional<Account> optionalAccount = Account.find("username = ?1 and csrfToken = ?2", username, csrfToken).firstResultOptional();
            
            if (optionalAccount.isPresent()) {
                Account existingAccount = optionalAccount.get();

                existingAccount.setCsrfToken(null);
                existingAccount.persist();
    
                return Response.ok("Sesión cerrada exitosamente").build();
            }
        }
        return Response.status(Response.Status.UNAUTHORIZED)
            .entity("No autorizado para cerrar sesión.")
            .build();
    }

    @POST
    @Path("/signup")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response registerAccount(Account newAccount) {
        if (accountExists(newAccount.getUsername())) {
            LOG.info("The username is existing: '" + newAccount.getUsername() + "'");
            
            return Response.status(Response.Status.UNAUTHORIZED)
                .entity("The username is existing, choose another.")
                .build();
        }

        // Generate encrypted password
        String password = newAccount.getPassword();
        newAccount.setPassword(SecurityUtil.createBCryptPassword(password));
        newAccount.setCsrfToken(CsrfUtil.getNewCsrfToken());

        newAccount.persist();
        LOG.info("New user: " + newAccount.getUsername());

        return Response.ok(newAccount).status(Response.Status.CREATED).build();
    }

    // Método auxiliar para verificar si un username ya existe en la base de datos
    private boolean accountExists(String username) {
        return Account.count("username", username) > 0;
    }
}
