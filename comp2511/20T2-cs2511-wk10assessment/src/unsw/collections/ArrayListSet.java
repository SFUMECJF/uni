/**
 *
 */
package unsw.collections;

import java.util.ArrayList;
import java.util.Iterator;
import java.lang.RuntimeException.*;
/**
 * An implementation of Set that uses an ArrayList to store the elements.
 *
 * @invariant All e in elements occur only once
 *
 * @author Robert Clifton-Everest
 *
 */
public class ArrayListSet<E> implements Set<E> {

    private ArrayList<E> elements;

    public ArrayListSet() {
        elements = new ArrayList<>();
    }

    @Override
    public void add(E e) {
        // TODO Implement me
        // will not add if it already contains the element
        if (!elements.contains(e)) {
            elements.add(e);
        }
    }

    @Override
    public void remove(E e) {
        elements.remove(e);
    }

    @Override
    public boolean contains(Object e) {
        return elements.contains(e);
    }

    @Override
    public int size() {
        return elements.size();
    }

    @Override
    public boolean subsetOf(Set<?> other) {
        // TODO Implement me
        /* Given a set will iterate through to determine
           If it is a subset.
           For something to be a subset, it other must be >= than 
           its comparative size
        */

        if (other.size() >= this.size()) {
            // check if it is a set instance
            if (other instanceof Set<?>) {
                // check if those instances exist in this set
                for (E aFruit : elements) {
                    if (!other.contains(aFruit)) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    @Override
    public Iterator<E> iterator() {
        // TODO Implement me
        // returns an simple iterator from set as indicated by the spec
        return elements.iterator();
    }

    @Override
    public Set<E> union(Set<? extends E> other) {
        // TODO Implement me
        // creates new set and appends the list if it doesn't exist
        Set<E> unionSet = new  ArrayListSet<>();

        for (E e : elements) {unionSet.add(e);}
        for (E e : other) {unionSet.add(e);}  

        return unionSet;
    }

    @Override
    public Set<E> intersection(Set<? extends E> other) {
        // TODO Implement me
        // creates a new set and appends if it exists in both/intersects
        // intersect meaning that both lists contain the element e
        // and which only one instance is added

        // checks if given set is valid. Returns empty set if not
        Set<E> interSet = new ArrayListSet<>();

        // sets appropriate checkers for whatever is larger being forCheck
        // no attempt at try/catch is neede as it assumes
        // a set is always given
        Set<E> forCheck = this;
        Set<E> checkAgainst = (Set<E>) other;
        if (elements.size() < other.size()) {
            forCheck = (Set<E>) other;                            
            checkAgainst = this;
        }

        for (E e : forCheck) {
            if (checkAgainst.contains(e)) {interSet.add(e);}
        }
        return interSet;
    }

    /**
     * For this method, it should be possible to compare all other possible sets
     * for equality with this set. For example, if an ArrayListSet<Fruit> and a
     * LinkedListSet<Fruit> both contain the same elements they are equal.
     * Similarly, if a Set<Apple> contains the same elements as a Set<Fruit>
     * they are also equal.
     */
    @Override
    public boolean equals(Object other) {
        // TODO Implement me

        // default equals cases.
        // null is false
        // if its directly equal, its true
        if (other == null) {return false;}
        if (this == other) {return true;}

        // checks set cases and whether their individual elements are equal
        if (!(other instanceof Set)) {return false;}
        

        // trues to cast other to a Set<E>
        // catches equals other not being a set
        // realistically should never catch but just in case it does 
        // and a bad set is cast, saves the loop
        Set<?> checker = new ArrayListSet<E>();
    
        try {
            checker = (Set<?>) other;
        } catch (ClassCastException e) {
            return false;
        }
        
        // iterates through iterator and returns false if something
        // does not contain in this Set.
        // Not contains = not equal
        // also checks for size of checked in case of 1 or 2 empty lists

        if (checker.size() != this.size()) {return false;}

        Iterator<?> iter = checker.iterator();
        while (iter.hasNext()) {
            if (!elements.contains(iter.next())) {return false;}
        }
        
        // else if passing through all those checks, it will return true
        return true;
    }

}
