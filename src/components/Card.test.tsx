import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';

let container: HTMLElement;

describe('Card Component', () => {

    const cardDummy = {
        title: "Title-test",
        body: "Body test",
        footer: "Footer-test",
        buttonlabel: "Button-test"

    }
    // code à executer avant chaque test
    beforeEach(() => {
        // création d'une div qui va conteir le composant testé
        container = document.createElement('div')
        // monter l'élément dans le (shadow) dom de jest
        document.body.appendChild(container)
    }) 
    // pas nécessaire
    // nettoie le dom après chaque test
    afterEach(cleanup)
    test('doit fournir un rendu', () => {
        // Faire un rendu du composant React avec ses props
        render(<Card title="Ma carte" body=""/>)
        // Récupére un élément à partir de son texte
        const carte = screen.getByText('Ma carte');
        // teste si l'élément récupéré par screen existe
        expect(carte).toBeInTheDocument()
    })
    test('Le titre est affiché dans la partie titre', () => {
        // rendu du composant dans le container, il faut lui donner un objet pour le container
        render(<Card title={cardDummy.title} body=""/>, {container})
        // recup du noeud DOM
        const cardTitleElement = container.querySelector('.card-title');
        //test
        expect(cardTitleElement).toBeInTheDocument();
        expect(cardTitleElement?.textContent).toBe(cardDummy.title)
    })
    test('Le body est affiché dans la partie body', () => {
        // rendu du composant dans le container, il faut lui donner un objet pour le container
        render(<Card title="" body={cardDummy.body}/>, {container})
        // recup du noeud DOM
        const cardBodyElement = container.querySelector('.card-body');
        //test
        expect(cardBodyElement).toBeInTheDocument();
        expect(cardBodyElement?.textContent).toBe(cardDummy.body)
    }) 
    test('Le footer est affiché dans la partie footer', () => {
        // rendu du composant dans le container, il faut lui donner un objet pour le container
        render(<Card title="" body="" footer={cardDummy.footer}/>, {container})
        // recup du noeud DOM
        const cardFooterElement = container.querySelector('.card-footer');
        //test
        expect(cardFooterElement).toBeInTheDocument();
        expect(cardFooterElement?.textContent).toBe(cardDummy.footer)
    }) 
    test("Le footer ne doit pas être présent quand je ne fournis pas la prop footer", () => {
        render(<Card body="" title="" />, {container})
        const cardFooterElement = container.querySelector('.card-footer');
        expect(cardFooterElement).not.toBeInTheDocument();  
    }) 
    test('Le composant carte doit tout afficher', () => {
        render(<Card body={cardDummy.body} title={cardDummy.title} footer={cardDummy.footer}/>, {container})
        const cardTitleElement = container.querySelector('.card-title')
        const cardBodyElement = container.querySelector('.card-body')
        const cardFooterElement = container.querySelector('.card-footer')
        expect(cardTitleElement).toBeInTheDocument();
        expect(cardTitleElement?.textContent).toBe(cardDummy.title);
        expect(cardBodyElement).toBeInTheDocument();
        expect(cardBodyElement?.textContent).toBe(cardDummy.body);
        expect(cardFooterElement).toBeInTheDocument();
        expect(cardFooterElement?.textContent).toBe(cardDummy.footer);
    })
    test('Le bouton doit apparaitre quand je met la props', () => {
        render(<Card title='' body='' buttonLabel='Valider' handleClick={() => {}}/>, {container}) 
        // const buttonElement = screen.getByRole('button')
        // const buttonElement = screen.getByText('Valider')
        const buttonElement = container.querySelector('button'); 
        expect(buttonElement).toBeInTheDocument() 
        expect(buttonElement?.textContent).toContain('Valider');
    })
    test('Le bouton doit appeler la fonction quand je clique dessus', () => {
        const handleClick = jest.fn(); // crée une fonction par jest qui va enregistrer le nombre de fois où il a été appelé = mock (ou spy) de la fonction passé du composant
        render(<Card title='' body='' buttonLabel='Valider' handleClick={handleClick}/>, {container}) 
        const buttonElement = container.querySelector('button'); 
        // simuler un click 
        fireEvent.click(buttonElement!);
        //vérifier que le spy a été appelé
        expect(handleClick).toHaveBeenCalled(); 
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})

export {}