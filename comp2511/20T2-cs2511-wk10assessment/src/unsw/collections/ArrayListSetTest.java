package unsw.collections;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import unsw.fruit.Apple;
import unsw.fruit.Fruit;
import unsw.fruit.Orange;

import java.util.Iterator;

class ArrayListSetTest {

    @Test
    void testBasics() {
        Set<String> set = new ArrayListSet<>();
        set.add("Hello");
        set.add("World");
        assertTrue(set.contains("Hello"));
        assertTrue(set.contains("World"));

        set.remove("Hello");
        assertFalse(set.contains("Hello"));
        assertTrue(set.contains("World"));
    }

    @Test
    void testSubsetOf() {
        Set<Fruit> fruit = new ArrayListSet<Fruit>();
        fruit.add(new Apple("Gala"));
        fruit.add(new Apple("Fuji"));
        fruit.add(new Orange("Navel"));

        Set<Apple> apples = new ArrayListSet<>();
        apples.add(new Apple("Gala"));
        apples.add(new Apple("Fuji"));

        assertTrue(apples.subsetOf(fruit));
        assertFalse(fruit.subsetOf(apples));

        fruit.remove(new Apple("Fuji"));

        assertFalse(apples.subsetOf(fruit));
    }

    @Test
    void testIterator() {
        Set<Apple> apples = new ArrayListSet<>();
        apples.add(new Apple("Gala"));
        apples.add(new Apple("Fuji"));
        apples.add(new Apple("Cameo"));

        Iterator<Apple> iter = apples.iterator();

        // check if iter is actually an iterator and not something useless
        assertTrue(iter instanceof Iterator<?>);
        
        // check if there are 3 items in iter
        assertTrue(iter.hasNext());

        Apple apple = iter.next();
        assertTrue(apple.getName() == "Gala");
        assertTrue(iter.hasNext());

        apple = iter.next();
        assertTrue(apple.getName() == "Fuji");
        assertTrue(iter.hasNext());

        apple = iter.next();
        assertTrue(apple.getName() == "Cameo");
        assertFalse(iter.hasNext());
    }

    @Test
    void testUnion() {
        // tests union of 2 sets of apples
        Set<Apple> apples1 = new ArrayListSet<Apple>();
        apples1.add(new Apple("Gala"));
        apples1.add(new Apple("Fuji"));
        apples1.add(new Apple("Ambrosia"));

        Set<Apple> apples2 = new ArrayListSet<Apple>();
        apples2.add(new Apple("Gala"));
        apples2.add(new Apple("Fuji"));
        apples2.add(new Apple("Cameo"));

        Set<Apple> appleUnion = apples1.union(apples2);
        
        // tests correct size of 4
        assertTrue(appleUnion.size() == 4); 
        
        // tests correct individual elements
        Iterator <Apple> iter = appleUnion.iterator();

        // checks if it exists
        assertTrue(iter.hasNext());

        // checks for 4 item union
        Apple apple = iter.next();
        assertTrue(apple.getName() == "Gala");

        apple = iter.next();
        assertTrue(apple.getName() == "Fuji");

        apple = iter.next();
        assertTrue(apple.getName() == "Ambrosia");

        apple = iter.next();
        assertTrue(apple.getName() == "Cameo");

        // checks if there are no more items in the iterator
        assertFalse(iter.hasNext());
    }

    @Test
    void testIntersection() {
        // Intersection of 2 sets of apples
        Set<Apple> apples1 = new ArrayListSet<Apple>();
        apples1.add(new Apple("Gala"));
        apples1.add(new Apple("Fuji"));

        Set<Apple> apples2 = new ArrayListSet<Apple>();
        apples2.add(new Apple("Gala"));
        apples2.add(new Apple("Fuji"));
        apples2.add(new Apple("Cameo"));
    
        Set<Apple> preappleInter = apples1.intersection(apples2);

        // tests correct size of 2 given varying size
        assertTrue(preappleInter.size() == 2); 

        Set<Apple> appleInter = preappleInter.intersection(apples2);

        // tests correct size of 2 after attempt to get duplicates
        assertTrue(preappleInter.size() == 2); 

        // tests correct individual elements
        Iterator <Apple> iter = appleInter.iterator();

        // attempts to intersect apples2 to see if duplicates are made
        
        // checks if it exists
        assertTrue(iter.hasNext());

        // checks for 2 item intersection
        Apple apple = iter.next();
        assertTrue(apple.getName() == "Gala");

        apple = iter.next();
        assertTrue(apple.getName() == "Fuji");

        // checks if there are no more items in the iterator
        assertFalse(iter.hasNext());
    }

    @Test
    void testEquals() {
        Set<Apple> apples1 = new ArrayListSet<Apple>();
        apples1.add(new Apple("Gala"));
        apples1.add(new Apple("Fuji"));
        apples1.add(new Apple("Ambrosia"));

        Set<Apple> apples2 = new ArrayListSet<Apple>();
        apples2.add(new Apple("Gala"));
        apples2.add(new Apple("Fuji"));
        apples2.add(new Apple("Cameo"));

        Set<Fruit> fruit1 = new ArrayListSet<Fruit>();
        fruit1.add(new Apple("Gala"));
        fruit1.add(new Apple("Fuji"));
        fruit1.add(new Apple("Ambrosia"));

        Set<Fruit> fruit2 = new ArrayListSet<Fruit>();
        fruit2.add(new Apple("Gala"));
        fruit2.add(new Apple("Fuji"));
        fruit2.add(new Apple("Ambrosia"));
        fruit2.add(new Orange("Naval"));

        // attempts to cast equals to set
        // warning is sent here but it can happen when coding so just in case
        assertFalse(apples1.equals(new Apple("Gala")));

        // attempts to equals on itself
        assertTrue(apples1.equals(apples1));
        // attempts to case equals on itself but in a different cast
        assertTrue(apples1.equals(fruit1));

        // attempts to equal with a non equal list
        assertFalse(apples1.equals(apples2));

        // attempts to equal with nonequal different cast list
        assertFalse(apples2.equals(fruit1));

        // attempts to equal will null
        assertFalse(apples1.equals(null));

        // attempts to equal overlapping lists
        assertFalse(fruit1.equals(fruit2));
        assertFalse(fruit2.equals(fruit1));

        // checks empty lists back and forth
        Set<Apple> empty1 = new ArrayListSet<Apple>();
        Set<Orange> empty2 = new ArrayListSet<Orange>();
        assertTrue(empty1.equals(empty2));
        assertTrue(empty2.equals(empty1));

    }
}
