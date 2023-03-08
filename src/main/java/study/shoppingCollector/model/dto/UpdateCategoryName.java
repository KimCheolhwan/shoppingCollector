package study.shoppingCollector.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCategoryName {
    private String user_id;
    private String oldCategoryName;
    private String newCategoryName;
}
