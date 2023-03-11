package study.shoppingCollector.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int user_id;
    private String loginId;
    private String loginPwd;
    private Timestamp register_date;
    private Timestamp update_date;
}
