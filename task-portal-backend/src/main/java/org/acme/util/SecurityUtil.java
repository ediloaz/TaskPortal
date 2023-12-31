package org.acme.util;

import org.wildfly.security.password.Password;
import org.wildfly.security.password.PasswordFactory;
import org.wildfly.security.password.WildFlyElytronPasswordProvider;
import org.wildfly.security.password.interfaces.BCryptPassword;
import org.wildfly.security.password.util.ModularCrypt;

import io.quarkus.elytron.security.common.BcryptUtil;

public class SecurityUtil {

  public static void test() throws Exception {

    String bCryptPasswordHash = BcryptUtil.bcryptHash("Password_1");
    String passwordToVerify = "Password_1";

    System.out.println(verifyBCryptPassword(bCryptPasswordHash, passwordToVerify)); // -> Debe ser true
    System.out.println(verifyBCryptPassword(bCryptPasswordHash, "NotPassword_1")); // --> Debe ser false
  }

  public static String createBCryptPassword(String password) {
    return BcryptUtil.bcryptHash(password);
  }

    public static boolean verifyBCryptPassword(String bCryptPasswordHash, String passwordToVerify) throws Exception {

        WildFlyElytronPasswordProvider provider = new WildFlyElytronPasswordProvider();

        // 1. Create a BCrypt Password Factory
        PasswordFactory passwordFactory = PasswordFactory.getInstance(BCryptPassword.ALGORITHM_BCRYPT, provider);

        // 2. Decode the hashed user password
        Password userPasswordDecoded = ModularCrypt.decode(bCryptPasswordHash);

        // 3. Translate the decoded user password object to one which is consumable by this factory.
        Password userPasswordRestored = passwordFactory.translate(userPasswordDecoded);

        // Verify existing user password you want to verify
        return passwordFactory.verify(userPasswordRestored, passwordToVerify.toCharArray());

    }
}