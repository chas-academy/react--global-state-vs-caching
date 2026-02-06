# 🦍 Frontendutveckling med ramverk - Pagination

I den här uppgiften kommer du lära dig om paginering, ett vanligt optimeringsknep när man jobbar med långa arrayer med mycket data.

## 👩‍💻 Steg

1. Installera alla dependencies som finns i package-filen
2. Utgå från filen i routen `the-list`
3. Lagra datan från `useGetUniversityList` en ny, tvådimensionell array efter `pageSize`. Dvs om `pageSize` är 20 så bör varje nästlade array innehålla 20 objekt

   ```ts
   const paginatedData = [
      [{
         ...
      },
      {
         ...
      }]
   ]
   ```

   - Om du inte vill skriva en egen funktion för detta kan du använda funktionen [`chunk`](https://remedajs.com/docs/#chunk) från det förinstallerade biblioteket [Remeda](https://remedajs.com/)

4. Använd en passande React hook för att undgå att den paginerade arrayen skapas på nytt vid varje omrendering. Den borde se alltid se likadan ut såvida du inte bygger extrafunktionalitet som låter användaren justera antalet tabellrader per sida
5. Se till att den paginerade arrayen används för att mappa igenom och skapa alla tabellrader
6. Använd de existerande UI-komponenterna för att skapa paginering, förslagsvis i `TableFooter`. Se [shadcns dokumentation](https://ui.shadcn.com/docs/components/radix/pagination) för kodexempel. Här kommer det krävas en del logik för att få `PaginationLink`-knapparna att visa rätt nummer samt för `PaginationNext` och `PaginationPrevious` att fungera fullt ut. Börja smått, kanske t.o.m hårdkoda`data` till att bara innehålla ett objekt till att börja med, och jobba dig därifrån. Du bör bl.a. ta höjd för följande saker:
   - På första sidan, att:
     - `PaginationPrevious`inte minskar värdet på `currentPage` med 1
     - `PaginationLink` längst till höger har rätt siffra
   - På sista sidan, att
     - `PaginationNext`inte ökar värdet på `currentPage` med 1
     - `PaginationLink` längst till vänster har rätt siffra
   - Att `isActive` är sant på rätt `PaginationLink` även på första och sista sidan

## 💡 Tips

Om tabellens sista sida har färre rader än de andra kommer pagineringsknapparna "hoppa" längre up på sidan eftersom tabellens höjd plötsligt minskat. Detta kan du exempelvis lösa genom att ta antalet rader på sista sidan minus `pageSize` och generera tomma tabellrader av restvärdet. Se kodexempelt nedan:

```ts
{Array.from({
   length: pageSize - (paginatedData[currentPage - 1]?.length ?? 0),
}).map(() => (
   <TableRow key={crypto.randomUUID()}>
   <TableCell colSpan={5} className="h-9.75" />
   </TableRow>
))}
```
