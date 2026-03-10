import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

actor {
  let menuItems = Map.empty<Nat, MenuItem>();
  let blogPosts = Map.empty<Nat, BlogPost>();

  var menuItemIndex = 0;
  var blogPostIndex = 0;

  type Nutrition = {
    calories : Nat;
    proteinGrams : Nat;
    carbsGrams : Nat;
    fatGrams : Nat;
    fiberGrams : Nat;
  };

  // 1. Menu Item Types and Management

  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    priceCents : Nat;
    category : Text; // "High Protein", "Vegan", "Bulk"
    nutrition : Nutrition;
  };

  public shared ({ caller }) func addMenuItem(
    name : Text,
    description : Text,
    priceCents : Nat,
    category : Text,
    nutrition : Nutrition,
  ) : async Nat {
    let id = menuItemIndex;
    let menuItem : MenuItem = {
      id;
      name;
      description;
      priceCents;
      category;
      nutrition;
    };
    menuItems.add(id, menuItem);
    menuItemIndex += 1;
    id;
  };

  public query ({ caller }) func getAllMenuItems() : async [MenuItem] {
    menuItems.values().toArray();
  };

  public query ({ caller }) func getMenuItemsByCategory(category : Text) : async [MenuItem] {
    menuItems.values().toArray().filter(
      func(item) { item.category == category }
    );
  };

  // 2. Blog Post Types and Management

  type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    body : Text;
    author : Text;
    category : Text; // "Nutrition", "Fitness", "Lifestyle"
    createdAt : Time.Time;
  };

  public shared ({ caller }) func addBlogPost(
    title : Text,
    excerpt : Text,
    body : Text,
    author : Text,
    category : Text,
  ) : async Nat {
    let id = blogPostIndex;
    let blogPost : BlogPost = {
      id;
      title;
      excerpt;
      body;
      author;
      category;
      createdAt = Time.now();
    };
    blogPosts.add(id, blogPost);
    blogPostIndex += 1;
    id;
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  public query ({ caller }) func getBlogPostsByCategory(category : Text) : async [BlogPost] {
    blogPosts.values().toArray().filter(
      func(post) { post.category == category }
    );
  };

  // 3. Initialization with Sample Data

  public shared ({ caller }) func initialize() : async () {
    // Sample Menu Items
    let sampleMenuItems : [MenuItem] = [
      {
        id = 0;
        name = "Grilled Chicken Bowl";
        description = "Juicy grilled chicken with brown rice and veggies.";
        priceCents = 1299;
        category = "High Protein";
        nutrition = {
          calories = 600;
          proteinGrams = 45;
          carbsGrams = 60;
          fatGrams = 15;
          fiberGrams = 8;
        };
      },
      {
        id = 1;
        name = "Vegan Power Plate";
        description = "Quinoa, black beans, tofu, and mixed greens.";
        priceCents = 1199;
        category = "Vegan";
        nutrition = {
          calories = 550;
          proteinGrams = 30;
          carbsGrams = 70;
          fatGrams = 12;
          fiberGrams = 10;
        };
      },
      {
        id = 2;
        name = "Bulk Beef Burrito";
        description = "Lean ground beef, rice, beans, and salsa wrap.";
        priceCents = 1349;
        category = "Bulk";
        nutrition = {
          calories = 750;
          proteinGrams = 50;
          carbsGrams = 90;
          fatGrams = 20;
          fiberGrams = 7;
        };
      },
      {
        id = 3;
        name = "Protein Pancakes";
        description = "Fluffy pancakes with protein powder and berries.";
        priceCents = 999;
        category = "High Protein";
        nutrition = {
          calories = 450;
          proteinGrams = 25;
          carbsGrams = 55;
          fatGrams = 10;
          fiberGrams = 6;
        };
      },
      {
        id = 4;
        name = "Vegan Lentil Soup";
        description = "Hearty lentil soup with veggies and spices.";
        priceCents = 899;
        category = "Vegan";
        nutrition = {
          calories = 380;
          proteinGrams = 22;
          carbsGrams = 40;
          fatGrams = 8;
          fiberGrams = 9;
        };
      },
      {
        id = 5;
        name = "Muscle Macro Mix";
        description = "Chicken, sweet potatoes, broccoli, and almonds.";
        priceCents = 1399;
        category = "Bulk";
        nutrition = {
          calories = 820;
          proteinGrams = 55;
          carbsGrams = 80;
          fatGrams = 25;
          fiberGrams = 11;
        };
      },
    ];

    // Add sample menu items
    for (item in sampleMenuItems.values()) {
      menuItems.add(item.id, item);
      menuItemIndex += 1;
    };

    // Sample Blog Posts
    let sampleBlogPosts : [BlogPost] = [
      {
        id = 0;
        title = "Benefits of High Protein Diets";
        excerpt = "Learn why protein is essential for health and muscle growth.";
        body = "Proteins are the building blocks of muscles, bones, skin, and blood. High protein diets can help with weight management, increasing muscle mass, and improving overall health...";
        author = "Jane Smith";
        category = "Nutrition";
        createdAt = Time.now();
      },
      {
        id = 1;
        title = "Plant-Based Protein Sources";
        excerpt = "Discover healthy and delicious vegan protein options.";
        body = "Plant-based proteins like beans, lentils, tofu, quinoa, and seeds are excellent sources of protein. They also provide fiber, vitamins, and minerals...";
        author = "Tom Johnson";
        category = "Nutrition";
        createdAt = Time.now();
      },
      {
        id = 2;
        title = "Meal Prep Tips for Busy Professionals";
        excerpt = "Save time and eat healthy with these meal prep strategies.";
        body = "Planning meals in advance helps you stay on track with your fitness goals. Use protein-rich ingredients like chicken, beans, and tofu for balanced meals...";
        author = "Emily Davis";
        category = "Lifestyle";
        createdAt = Time.now();
      },
      {
        id = 3;
        title = "Protein and Exercise: The Perfect Pair";
        excerpt = "Maximize your workouts with the right nutrition.";
        body = "Combining exercise with adequate protein intake helps build and recover muscles, maintain a healthy weight, and boost energy levels...";
        author = "Mike Lee";
        category = "Fitness";
        createdAt = Time.now();
      },
    ];

    // Add sample blog posts
    for (post in sampleBlogPosts.values()) {
      blogPosts.add(post.id, post);
      blogPostIndex += 1;
    };
  };
};
