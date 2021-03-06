package com.assertion.passwordmanager.operations;

import java.util.HashMap;import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class FetchSavedPasswords {
	private final static String url = "jdbc:postgresql://localhost:5432/postgres";
    private final static String user = "postgres";
    private final static String password = "admin";
    static HashMap<String, String> savedPasswords = new HashMap<>(); 
    
   
    public static HashMap<String, String> fetchPasswords() {
        try {
        	Connection conn=DriverManager.getConnection(url, user, password);
          try (PreparedStatement selectStmt = conn.prepareStatement(
                  "SELECT * from passwords");
               ResultSet rs = selectStmt.executeQuery()) {
            if (!rs.isBeforeFirst()) {
              System.out.println("no rows found");
              savedPasswords.clear();
            }
            else {
            	savedPasswords.clear();
            	while (rs.next()) {
            	  savedPasswords.put(rs.getString(1),rs.getString(2));
              }
            }
          }
          
        }
        catch (SQLException e) {
          throw new RuntimeException(e);
        }
        return savedPasswords;
      }
}
