package org.acme.util;

import java.util.UUID;
import org.acme.Account;
import java.util.Optional;

public class CsrfUtil {
  // This can be improved with cache management or session management like SessionScoped
  public static Boolean validateCsrfToken(String username, String csrfToken) {
    Optional<Account> optionalAccount = Account.find("username = ?1 and csrfToken = ?2", username, csrfToken).firstResultOptional();
    if (optionalAccount.isPresent()) {
        return true;
    } else {
        return false;
    }
  }

  public static Boolean validateCsrfToken(Integer userId, String csrfToken) {
    Optional<Account> optionalAccount = Account.find("id = ?1 and csrfToken = ?2", userId, csrfToken).firstResultOptional();
    if (optionalAccount.isPresent()) {
        return true;
    } else {
        return false;
    }
  }

  public static String getNewCsrfToken() {
    return UUID.randomUUID().toString();
  }
}