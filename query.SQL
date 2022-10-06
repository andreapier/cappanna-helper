-- Estrazione totale incassi
SELECT
	SUM(D.Quantity * M.Price) AS Importo
FROM
	ChOrders AS O
	INNER JOIN OrderDetails AS D ON O.Id = D.OrderId
	INNER JOIN MenuDetails AS M ON D.ItemId = M.Id
	INNER JOIN Shifts AS S ON O.ShiftId = S.Id
	INNER JOIN Stands AS SS ON O.StandId = SS.Id;

-- Estrazione totale incassi per giorno e stand
SELECT
	SS.Description AS Stand,
	S.Description AS Turno,
	SUM(D.Quantity * M.Price) AS Importo
FROM
	ChOrders AS O
	INNER JOIN OrderDetails AS D ON O.Id = D.OrderId
	INNER JOIN MenuDetails AS M ON D.ItemId = M.Id
	INNER JOIN Shifts AS S ON O.ShiftId = S.Id
	INNER JOIN Stands AS SS ON O.StandId = SS.Id
GROUP BY SS.Id, SS.Description, S.Id, S.Description
ORDER BY SS.Id, S.Id;

-- Estrazione incasso per cameriere
SELECT
	U.Username,
	SUM(D.Quantity * M.Price) AS Importo
FROM
	ChOrders AS O
	INNER JOIN OrderDetails AS D ON O.Id = D.OrderId
	INNER JOIN MenuDetails AS M ON D.ItemId = M.Id
	INNER JOIN Shifts AS S ON O.ShiftId = S.Id
	INNER JOIN Users AS U ON O.CreatedById = U.Id
GROUP BY U.Id
ORDER BY SUM(D.Quantity * M.Price) DESC;

-- Estrazione qta totali per piatto per giorno
select strftime('%d/%m/%Y', c.CreationTimestamp) as giorno, m.Name as piatto, sum(d.Quantity)
from ChOrders as c
join OrderDetails as d on c.Id = d.OrderId
join MenuDetails as m on d.ItemId = m.Id
where m."Group" in ('Antipasti', 'Primi piatti', 'Secondi piatti', 'Contorni', 'Dolci')
group by strftime('%d/%m/%Y', c.CreationTimestamp), m.Name
order by m.Name, m."Group", giorno

-- Estrazione qta totali per vino per giorno
select strftime('%d/%m/%Y', c.CreationTimestamp) as giorno, m.Name as piatto, sum(d.Quantity)
from ChOrders as c
join OrderDetails as d on c.Id = d.OrderId
join MenuDetails as m on d.ItemId = m.Id
where m."Group" in ('Vini Bianchi', 'Vini Rossi', 'Bibite', 'Acqua')
group by strftime('%d/%m/%Y', c.CreationTimestamp), m.Name
order by m.Name, m."Group", giorno

