Feature: Shopping Cart

  Scenario: Successful cart entry
    Given I am on a product's details page
    When I add the product to my cart
    Then I should see the item in my cart and be able to proceed to checkout
