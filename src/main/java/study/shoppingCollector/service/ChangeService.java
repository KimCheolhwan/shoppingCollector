package study.shoppingCollector.service;

import study.shoppingCollector.model.dto.Category;
import study.shoppingCollector.model.dto.ChangeParameter;
import study.shoppingCollector.model.dto.UpdateCategoryName;

public interface ChangeService {

    Category getCategory(Category category);

    boolean updateCategoryName(UpdateCategoryName param);

    boolean updateProductName(ChangeParameter param);

    boolean updateManufacturer(ChangeParameter param);

    boolean updateWarehouseDate(ChangeParameter param);

    boolean updateCategory(ChangeParameter param);

    boolean updateUnit(ChangeParameter param);

}
